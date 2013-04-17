# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Card.versions'
        db.add_column(u'cube_diff_card', 'versions',
                      self.gf('jsonfield.fields.JSONField')(null=True),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Card.versions'
        db.delete_column(u'cube_diff_card', 'versions')


    models = {
        u'cube_diff.card': {
            'Meta': {'object_name': 'Card'},
            '_color_indicator': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            'converted_mana_cost': ('django.db.models.fields.IntegerField', [], {}),
            'loyalty': ('django.db.models.fields.IntegerField', [], {'null': 'True'}),
            'mana_cost': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200', 'primary_key': 'True'}),
            'power': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True'}),
            'subtypes': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            'text': ('django.db.models.fields.CharField', [], {'max_length': '8192', 'null': 'True'}),
            'toughness': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True'}),
            'types': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            'versions': ('jsonfield.fields.JSONField', [], {'null': 'True'}),
            'watermark': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True'})
        },
        u'cube_diff.cube': {
            'Meta': {'object_name': 'Cube'},
            'cards': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['cube_diff.Card']", 'symmetrical': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '200'}),
            'owners': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['cube_diff.User']", 'symmetrical': 'False'})
        },
        u'cube_diff.user': {
            'Meta': {'object_name': 'User'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['cube_diff']