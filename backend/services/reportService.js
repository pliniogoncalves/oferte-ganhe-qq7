const { PythonShell } = require('python-shell');
const path = require('path');

const pythonExecutable = os.platform() === 'win32'
    ? path.join(__dirname, '../../.venv/Scripts/python.exe') 
    : path.join(__dirname, '../../.venv/bin/python');

PythonShell.defaultOptions = {
    pythonPath: pythonExecutable,
};

// Export Users Report
async function exportUsersReport() {
    const scriptPath = path.join(__dirname, '../reports/export_users.py');
    
    return new Promise((resolve, reject) => {
        PythonShell.run(scriptPath, {}, (err, results) => {
            if(err){
                console.error('Erro ao executar o script Python:', err);
                reject(err);
            }else{
                console.log('Script Python executado com sucesso:', results);
                resolve(path.join(__dirname, '../../relatorios/usuarios.csv'));
            }
        });
    });
}

module.exports = {
    exportUsersReport,
};
