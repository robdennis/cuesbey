# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting model 'LinkedDiff'
        db.delete_table(u'cube_diff_linkeddiff')

        # Adding model 'SharedDiff'
        db.create_table(u'cube_diff_shareddiff', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('external_link', self.gf('uuidfield.fields.UUIDField')(unique=True, max_length=32, blank=True)),
            ('before', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('after', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('spec', self.gf('django.db.models.fields.CharField')(max_length=4096)),
            ('heuristics', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('links', self.gf('django.db.models.fields.IntegerField')(default=0)),
        ))
        db.send_create_signal(u'cube_diff', ['SharedDiff'])


    def backwards(self, orm):
        # Adding model 'LinkedDiff'
        db.create_table(u'cube_diff_linkeddiff', (
            ('heuristics', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('links', self.gf('django.db.models.fields.IntegerField')(default=0)),
            ('after', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('external_link', self.gf('uuidfield.fields.UUIDField')(max_length=32, unique=True, blank=True)),
            ('spec', self.gf('django.db.models.fields.CharField')(max_length=4096, primary_key=True)),
            ('before', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
        ))
        db.send_create_signal(u'cube_diff', ['LinkedDiff'])

        # Deleting model 'SharedDiff'
        db.delete_table(u'cube_diff_shareddiff')


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
            'versions': ('jsonfield.fields.JSONField', [], {}),
            'watermark': ('django.db.models.fields.CharField', [], {'max_length': '200', 'null': 'True'})
        },
        u'cube_diff.cube': {
            'Meta': {'object_name': 'Cube'},
            'cards': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['cube_diff.Card']", 'symmetrical': 'False'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '200'}),
            'owners': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['cube_diff.User']", 'symmetrical': 'False'})
        },
        u'cube_diff.shareddiff': {
            'Meta': {'object_name': 'SharedDiff'},
            'after': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            'before': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            'external_link': ('uuidfield.fields.UUIDField', [], {'unique': 'True', 'max_length': '32', 'blank': 'True'}),
            'heuristics': ('django_orm.postgresql.fields.arrays.ArrayField', [], {'default': 'None', 'dbtype': "'text'", 'null': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'links': ('django.db.models.fields.IntegerField', [], {'default': '0'}),
            'spec': ('django.db.models.fields.CharField', [], {'max_length': '4096'})
        },
        u'cube_diff.user': {
            'Meta': {'object_name': 'User'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '200'})
        }
    }

    complete_apps = ['cube_diff']