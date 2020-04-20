import uuid 

class Session():
    def __init__(self):
        self.id = uuid.uuid4()
        self.vars = {}

    def set(self, algo, path=None, ext=None, object=None):
        if(path != None):
            self.vars[self.id] = {
            f"{algo}_path": path,
            f"{algo}_ext": ext
        } 
        if(object != None):
            self.vars[self.id][f"{algo}"] = object
        

    def get(self, key):
        return self.vars[self.id][key]

    def __str__(self):
        for key, val in self.vars[self.id]:
            print(key, val)