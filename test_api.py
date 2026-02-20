import urllib.request
import json

try:
    with urllib.request.urlopen('http://localhost:8080/api/catalog/config') as response:
        data = response.read().decode('utf-8')
        print(f"Status: {response.status}")
        print(f"Content: {data}")
except Exception as e:
    print(f"Error: {e}")
