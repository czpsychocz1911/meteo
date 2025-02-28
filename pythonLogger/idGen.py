import secrets

METEOR_ID_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz'

def generate_meteor_id(lenght=17):
    """
    Generate a Meteor-compatible random ID
    Default length is 17 chars (matches Meteor's default)
    """
    result = ""
    for _ in range(lenght):
        idx = secrets.randbelow(len(METEOR_ID_CHARS))
        result += METEOR_ID_CHARS[idx]
    return result