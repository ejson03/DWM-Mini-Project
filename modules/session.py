import uuid 

class Session():
    def __init__(self):
        self.id = uuid.uuid4()
        self.vars = {
            self.id : {}
        }

    def set(self, algo, path=None, ext=None, object=None):
        if(path != None):
            main = self.vars[self.id]
            main[f"{algo}_path"] =  path,
            main[f"{algo}_ext"] =  ext
        
        if(object != None):
            main = self.vars[self.id]
            main[f"{algo}"] = object
        

    def get(self, key):
        main = self.vars[self.id]
        return main[key]

    def __str__(self):
        return str(self.vars[self.id])