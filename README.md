# chennai-street-crawler

Basic scraper to output JSON and CSV of Chennai streets

Sample content:

```
7H BUS STAND,19140,MUGAPPAIR,20087,EVEREST COLONY,28033
7H BUS STAND,19140,MUGAPPAIR,20087,PATTANATHAR SALAI 10TH BLOCK 1 CROSS ST,28960
7H BUS STAND,19140,MUGAPPAIR,20087,PATTANATHAR SALAI 10TH BLOCK III CROSS ST,28028
A.N.W.EXTN,19175,COLLECTOR NAGAR BUS STOP,19320,2ND AVENUE,26332
A.N.W.EXTN,19175,COLLECTOR NAGAR BUS STOP,19320,33RD STREET,29429
```

## Download data

Excel: https://github.com/cag-org-in/chennai-street-crawler/blob/master/chennai-streets.xlsx

CSV: https://github.com/cag-org-in/chennai-street-crawler/blob/master/areas.csv

JSON: https://github.com/cag-org-in/chennai-street-crawler/blob/master/areas.json 

## Updating scraper content

```bash
node streetscraper.js
node json_to_csv.js
```

Generates:

areas.json
areas.csv

Use Excel's Import CSV to generate the Excel file

Open source, MIT license
