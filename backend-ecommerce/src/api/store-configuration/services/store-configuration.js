'use strict';

/**
 * store-configuration service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::store-configuration.store-configuration');
