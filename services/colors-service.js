const Color = require('../models/Color').model;
const DEFAULT_PAGE_SIZE = 6;
const DEFAULT_PAGE_INDEX = 0;


class ColorsService {
    getPagination(page,pageSize) {
        const limit = pageSize ? +pageSize : DEFAULT_PAGE_SIZE;
        const offset = page ? page * limit : DEFAULT_PAGE_INDEX;
        return { limit, offset };
    };

    getPagingData(data, page, limit){
        const { count: totalColors, rows: colors } = data;
        const currentPage = page ? +page : DEFAULT_PAGE_INDEX;
        const totalPages = Math.ceil(totalColors / limit);
        return { totalColors, colors, totalPages, currentPage };
    };

    findColors(page, pageSize, order){
        const { limit, offset } = this.getPagination(page, pageSize);
        return Color.findAndCountAll({
            limit,
            offset,
            order: [
                [
                    'created_at', order,
                ]
            ]
        }).then(colors => {
            return this.getPagingData(colors, page, limit);
        });
    }
}

module.exports = ColorsService;
