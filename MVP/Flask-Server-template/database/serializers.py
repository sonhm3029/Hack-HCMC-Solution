from marshmallow import Schema, fields


class UserSchema(Schema):
    _id = fields.String()
    username = fields.String()
    password = fields.String()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    
class ImagesSchema(Schema):
    _id = fields.String()
    location = fields.String(required=True)
    note = fields.String(required=False)
    files = fields.List(fields.String())
    predict_results = fields.Dict(require=False)
    place_context = fields.String(required=False)
    created_at = fields.DateTime()
    updated_at = fields.DateTime()

