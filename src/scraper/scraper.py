import requests
import json

listUrl = 'https://api.untappd.com/v4/user/checkins/mustached'
clientId = 'client_id=xxxx'
clientSecret = 'client_secret=xxxx'
url = listUrl + '?' + clientId + '&' + clientSecret +  '&limit=50'
outputJSON = []
loopSuccess = True

print('Starting Scrape...')

while url:
    response = requests.get(url)
    data = response.json()
    if data['response'] and data['response']['checkins']:
        for key in data['response']['checkins']['items']:
            outputJSON.append(key)
        if data['response'] and data['response']['pagination'] and data['response']['pagination']['next_url']:
            url = data['response']['pagination']['next_url'] + '&' + clientId + '&' + clientSecret +  '&limit=50'
        else:
            url = 0

    elif data['meta']:
        loopSuccess = False
        print('Stopping Process:', data['meta'])
        url = 0
        break

if loopSuccess:
    print('Success! Writing to JSON File')
    with open("src/scraper/output.json", "w") as jsonFile:
        json.dump(outputJSON, jsonFile)
