import uuid 

class Session():
    def __init__(self):
        self.id = uuid.uuid4()
        self.vars = {
            self.id : {}
        }

    def set(self, algo, path=None, ext=None, object=None):
        if(path != None):
            self.vars[self.id][f"{algo}_path"] = path
            self.vars[self.id][f"{algo}_ext"] =  ext
            print(self.vars)
        
        if(object != None):
            self.vars[self.id][f"{algo}"] = object
            print(self.vars)
        

    def get(self, key):
        print(self.vars)
        return self.vars[self.id][key]


    def __str__(self):
        return str(self.vars[self.id])