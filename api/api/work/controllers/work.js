const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { uid } = ctx.params;

    const entity = await strapi.services.work.findOne({ uid });
    return sanitizeEntity(entity, { model: strapi.models.work });
  },
};
