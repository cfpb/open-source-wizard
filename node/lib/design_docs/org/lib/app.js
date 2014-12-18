// Generated by IcedCoffeeScript 1.8.0-c
(function() {
  var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  exports.views = {
    by_type: {
      map: function(doc) {
        var team_data;
        team_data = require('views/lib/team_data').parse(doc._id);
        if (!team_data) {
          return;
        }
        return emit([team_data.team, team_data.typ, team_data.name], 1);
      }
    }
  };

  exports.lists = {
    get_docs: function(header, req) {
      var out, row;
      out = [];
      while ((row = getRow())) {
        out.push(row.doc);
      }
      return JSON.stringify(out);
    }
  };

  exports.validate_doc_update = function(newDoc, oldDoc, userCtx, secObj) {
    log(newDoc);
    log(oldDoc);
    log(userCtx);
    log(secObj);
    return require('lib/validation').validate_doc_update(newDoc, oldDoc, userCtx, secObj);
  };

  exports.updates = {
    do_action: function(team, req) {
      var action, body, container, h, i, item, key, value, _;
      _ = require('lib/underscore');
      h = require('lib/helpers');
      if (!team) {
        return [null, '{"status": "error", "msg": "team not found"}'];
      }
      body = JSON.parse(req.body);
      value = body.value;
      action = body.action;
      key = body.key;
      if (action === 'u+') {
        container = h.mk_objs(team.roles, [key], []);
        if (__indexOf.call(container, value) >= 0) {
          return [null, JSON.stringify(team)];
        } else {
          container.push(value);
        }
      } else if (action === 'u-') {
        container = h.mk_objs(team.roles, [key], []);
        if (__indexOf.call(container, value) < 0) {
          return [null, JSON.stringify(team)];
        } else {
          i = container.indexOf(value);
          container.splice(i, 1);
        }
      } else if (action === 'a+') {
        container = h.mk_objs(team.rsrcs, [key, 'assets'], []);
        item = _.find(container, function(item) {
          return (item.id && (item.id === value.id || String(item.id) === value.id)) || (item["new"] && item["new"] === value["new"]);
        });
        if (item) {
          return [null, JSON.stringify(team)];
        } else {
          container.push(value);
        }
      } else if (action === 'a-') {
        container = h.mk_objs(team.rsrcs, [key, 'assets'], []);
        item = _.find(container, function(item) {
          return item.id === value || String(item.id) === value;
        });
        if (!item) {
          return [null, JSON.stringify(team)];
        } else {
          i = container.indexOf(item);
          container.splice(i, 1);
        }
      } else {
        return [null, '{"status": "error", "msg": "invalid action"}'];
      }
      team.audit.push({
        u: req.userCtx.name,
        dt: +new Date(),
        a: action,
        k: key,
        v: value,
        id: body.uuid
      });
      return [team, JSON.stringify(team)];
    }
  };

  exports.rewrites = [];

}).call(this);
