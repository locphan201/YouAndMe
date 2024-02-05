import json
import uuid

class JsonFileManager:
    def __init__(self, filename):
        self.filename = f'database/data/{filename}'
        self.getData() 

    def getData(self):
        with open(self.filename, 'r') as file:
            self.data = json.load(file)
    
    def get_all(self):
        return self.data
    
    def get(self, id):
        return self.data.get(id, {})

    def save(self):
        with open(self.filename, 'w') as file:
            json.dump(self.data, file, indent=4)

    def create(self, event):
        id = str(uuid.uuid4().hex)[:8]
        self.data[id] = event
        self.save()

    def update(self, id, new_value):
        if id in self.data.keys():
            self.data[id] = new_value
            self.save()

    def delete(self, id):
        if id in self.data.keys():
            del self.data[id]
            self.save()

class EventsManager(JsonFileManager):
    def __init__(self):
        super().__init__(filename='events.json')

class WishListManager(JsonFileManager):
    def __init__(self):
        super().__init__(filename='wishlist.json')

class SettingsManager(JsonFileManager):
    def __init__(self):
        super().__init__(filename='settings.json')