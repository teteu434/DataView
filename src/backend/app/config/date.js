export function dataTimerExpirar(){
    const timer = new Date();
    const horas = timer.getHours() + 4;
    return `${timer.getFullYear()}-${String(timer.getMonth() + 1).padStart(2, '0')}-${String(timer.getDate()).padStart(2, '0')} ${String(horas).padStart(2, '0')}:${String(timer.getMinutes()).padStart(2, '0')}:${String(timer.getSeconds()).padStart(2, '0')}`
}