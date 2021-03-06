/**
 * Copyright (c) 2015 Guyon Roche
 * LICENCE: MIT - please refer to LICENCE file included with this module
 * or https://github.com/guyonroche/exceljs/blob/master/LICENSE
 */

'use strict';

var utils = require('../../../utils/utils');
var BaseXform = require('../base-xform');

var IntegerXform = module.exports = function(options) {
  this.tag = options.tag;
  this.attr = options.attr;
  this.attrs = options.attrs;
};

utils.inherits(IntegerXform, BaseXform, {
  
  render: function(xmlStream, model) {
    // int is different to float in that zero is not rendered
    if (model) {
      xmlStream.openNode(this.tag);
      if (this.attrs) {
        xmlStream.addAttributes(this.attrs);
      }
      if (this.attr) {
        xmlStream.addAttribute(this.attr, model);
      } else {
        xmlStream.writeText(model);
      }
      xmlStream.closeNode();
    }
  },

  parseOpen: function(node) {
    if (node.name === this.tag) {
      if (this.attr) {
        this.model = parseInt(node.attributes[this.attr], 10);
      } else {
        this.text = [];
      }
      return true;
    }
    return false;
  },
  parseText: function(text) {
    if (!this.attr) {
      this.text.push(text);
    }
  },
  parseClose: function() {
    if (!this.attr) {
      this.model = parseInt(this.text.join('') || 0, 10);
    }
    return false;
  }
});
