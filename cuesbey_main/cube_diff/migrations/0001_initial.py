# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Card'
        db.create_table(u'cube_diff_card', (
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200, primary_key=True)),
            ('mana_cost', self.gf('django.db.models.fields.CharField')(max_length=200, null=True)),
            ('converted_mana_cost', self.gf('django.db.models.fields.IntegerField')()),
            ('types', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('subtypes', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('text', self.gf('django.db.models.fields.CharField')(max_length=8192, null=True)),
            ('_color_indicator', self.gf('django_orm.postgresql.fields.arrays.ArrayField')(default=None, dbtype='text', null=True, blank=True)),
            ('watermark', self.gf('django.db.models.fields.CharField')(max_length=200, null=True)),
            ('power', self.gf('django.db.models.fields.CharField')(max_length=200, null=True)),
            ('toughness', self.gf('django.db.models.fields.CharField')(max_length=200, null=True)),
            ('loyalty', self.gf('django.db.models.fields.IntegerField')(null=True)),
        ))
        db.send_create_signal(u'cube_diff', ['Card'])

        # Adding model 'Cube'
        db.create_table(u'cube_diff_cube', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(unique=True, max_length=200)),
        ))
        db.send_create_signal(u'cube_diff', ['Cube'])

        # Adding M2M table for field cards on 'Cube'
        db.create_table(u'cube_diff_cube_cards', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('cube', models.ForeignKey(orm[u'cube_diff.cube'], null=False)),
            ('card', models.ForeignKey(orm[u'cube_diff.card'], null=False))
        ))
        db.create_unique(u'cube_diff_cube_cards', ['cube_id', 'card_id'])

        # Adding M2M table for field owners on 'Cube'
        db.create_table(u'cube_diff_cube_owners', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('cube', models.ForeignKey(orm[u'cube_diff.cube'], null=False)),
            ('user', models.ForeignKey(orm[u'cube_diff.user'], null=False))
        ))
        db.create_unique(u'cube_diff_cube_owners', ['cube_id', 'user_id'])

        # Adding model 'User'
        db.create_table(u'cube_diff_user', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=200)),
        ))
        db.send_create_signal(u'cube_diff', ['User'])


    def backwards(self, orm):
        # Deleting model 'Card'
        db.delete_table(u'cube_diff_card')

        # Deleting model 'Cube'
        db.delete_table(u'cube_diff_cube')

        # Removing M2M table for field cards on 'Cube'
        db.delete_table('cube_diff_cube_cards')

        # Removing M2M table for field owners on 'Cube'
        db.delete_table('cube_diff_cube_owners')

        # Deleting model 'User'
        db.delete_table(u'cube_diff_user')


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