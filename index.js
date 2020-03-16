/**
 * A simple data extractor for Stavanger Kommunes Anleggsregister API
 * https://open.stavanger.kommune.no/dataset/anleggsregister/resource/6edbb299-19c9-4fbf-add3-daae80addead?view_id=a2ab00b2-6e94-4a8b-b5c7-34f47622302d
 * 
 * @usage node index.js [ObjectTypeFilter]
 * */

const FileSystem = require('fs');

const http = require('https');

const DATA_URI = 'https://opencom.no/dataset/f5b758cf-9a21-419a-a311-e6eceeb7f29c/resource/6edbb299-19c9-4fbf-add3-daae80addead/download/anleggsregister.json';

console.log('Fetching data...');
(async () => {
    try {
        const requestFinished = (jsonResult) => {
            const filter = process.argv[2] || 'SportIdrettPlass';
            console.log('Using filter: ', filter);

            const result = jsonResult.features.filter(f => {
                return f.properties.Objektype === filter;
            });
        
            console.log(`Found ${result.length} features that matches your criteria`);
            console.log('Dumping to file: resultset.json')
        
            FileSystem.writeFile('./resultset.json', JSON.stringify(result,null,2), {}, () => {
                console.log('File written successfully');
            });
        }

        http.get(DATA_URI, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
                //console.log('appending data: ', chunk);
            })

            response.on('end', () => {
                console.log('StatusCode: ', response.statusCode);
                if (response.statusCode === 200) {
                    try {
                        let jsonResult = JSON.parse(data);
                        requestFinished(jsonResult);
                    } catch (err) {
                        console.log('Failed to parse JSON data: ', data);
                    }
                }
            });
        }).on('error', (err) => {
            console.log('HTTP Error received: ', err.message);
        })
    
    } catch (err) {
        console.log('Failed to fetch data: ', err.message);
    }
})();