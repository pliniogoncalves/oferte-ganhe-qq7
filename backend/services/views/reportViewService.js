const reportService = require('../../services/reportService');

const reportViewService = {
    getReports: async () => {
        try{
            return reportService.getAllReports();
        }catch(error){
            console.error('Erro ao buscar relatórios:', error.message);
            throw error;
        }
    }
}

module.exports = reportViewService;