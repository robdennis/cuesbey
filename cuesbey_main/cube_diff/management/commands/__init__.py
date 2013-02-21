import uuid
import hashlib

def _get_uuid(name):
    return uuid.uuid5(uuid.UUID('123456781234567812345678123AA1AA'), name)

def md5_checksum(filePath):
    fh = open(filePath, 'rb')
    m = hashlib.md5()
    while True:
        data = fh.read(8192)
        if not data:
            break
        m.update(data)
    return m.hexdigest()