const reportViewService = require('../../services/views/reportViewService');

const reportViewController = {
    getReportsPage: async (req, res) => {
        try{
            const reports = await reportViewService.getReports();
            res.render('partials/reports/reports', { 
                layout: false, 
                title: 'Gestão de Relatórios',
                reports
            });
        }catch(error){
            console.error('Erro ao carregar relatórios:', error);
            res.status(500).send('Erro ao carregar a página de relatórios');
        }
    },

    viewReport: (req, res) => {
        const report = req.params.report;

        const pages = {
            showReportUsers: { view: 'partials/users/users', title: 'Gestão de Usuários' },
            showReportProfiles: { view: 'partials/profiles/profiles', title: 'Gestão de Perfis' },
            showReportTalons: { view: 'partials/talons/talons', title: 'Gestão de Talões' },
            showReportStocks: { view: 'partials/stocks/stocks', title: 'Gestão de Estoque' },
            showReportStores: { view: 'partials/stores/stores', title: 'Gestão de Loja' },
        };

        const page = pages[report];
        if (page) {
            console.log('Página encontrada:', page);
            res.render(page.view, { title: page.title });
        } else {
            res.status(404).send('Relatório não encontrado');
        }
    },

    downloadReport: (req, res) => {
        const reportCSV = req.params.reportCSV;
        const filePath = path.join(__dirname, '../../../relatorios', `${reportCSV}.csv`);

        res.download(filePath, `${reportCSV}.csv`, (err) => {
            if (err) {
                console.error('Erro ao baixar arquivo:', err.message);
                res.status(500).send('Erro ao baixar o arquivo');
            }
        });
    }

}

module.exports = reportViewController