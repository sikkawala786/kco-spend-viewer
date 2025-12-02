// scripts/csv_to_json.js
// Usage: node scripts/csv_to_json.js
const fs = require('fs');
const path = require('path');
// NOTE: use the modern sync import
const { parse } = require('csv-parse/sync');

function readCSV(filename){
  const p = path.join(__dirname,'..','data', filename);
  if(!fs.existsSync(p)){
    console.error('Missing file:', p);
    process.exit(1);
  }
  const txt = fs.readFileSync(p, 'utf8');
  return parse(txt, {columns: true, skip_empty_lines: true});
}

function normalizeRecord(r, provider){
  const date = r.usage_start_date || r.usage_date || r.start_date || r.date || r.billing_date || r['line_item_usage_start_date'] || '';
  const service = r.product || r.service || r.sku_description || r.service_description || 'Unknown';
  const team = r.team || r.tags || r.cost_center || r['resource.labels.team'] || 'Unknown';
  const env = (r.env || r.environment || r.Environment || '').toLowerCase() || 'prod';
  const cost = parseFloat(r.cost || r.unblended_cost || r.cost_usd || r.amount || r['BlendedCost'] || r['cost_usd'] || 0) || 0;
  return {
    date,
    cloud_provider: provider,
    service,
    team,
    env,
    cost_usd: +cost.toFixed(2)
  };
}

const awsFile = 'aws_line_items_12mo.csv';
const gcpFile = 'gcp_billing_12mo.csv';

const aws = readCSV(awsFile).map(r => normalizeRecord(r,'AWS'));
const gcp = readCSV(gcpFile).map(r => normalizeRecord(r,'GCP'));

const combined = [...aws, ...gcp].slice(0,300);

const outDir = path.join(__dirname,'..','public');
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir);
fs.writeFileSync(path.join(outDir,'data.json'), JSON.stringify(combined, null, 2));
console.log('WROTE public/data.json with', combined.length, 'rows');
