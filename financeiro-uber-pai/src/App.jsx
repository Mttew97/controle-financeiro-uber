import { useState } from 'react'
import './App.css'



function App() {
    const [corridas, setCorridas] = useState('')
    const [data, setData] = useState('')
    const [valorGanho, setValorGanho] = useState('')
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('')
    function handleSubmit(e) {
    e.preventDefault()
    const dadosConvertidos={
      corridas: parseFloat(corridas),
      valorGanho: parseFloat(valorGanho),
      horasTrabalhadas: parseFloat(horasTrabalhadas),
      data: data
    }
    console.log( dadosConvertidos )
}

return (
    <>
     <h1>Controle Financeiro</h1>
     <form onSubmit={handleSubmit}>
     <label htmlFor="corridas">Quantidade de corridas</label>
      <input 
        id="corridas"
        type="number"
        value={corridas}
        onChange={(e) => setCorridas(e.target.value)}
      />
      <label htmlFor="data">Data</label>
      <input 
        id="data"
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)} 
      />
      <label htmlFor="valorG">Valor ganho no dia</label>
      <input 
        id="valorG"
        type="number" 
        value={valorGanho}
        onChange={(e) => setValorGanho(e.target.value)}
      />
      <label htmlFor="horasT">Horas trabalhadas</label>
      <input 
        id="horasT"
        type="number" 
        value={horasTrabalhadas}
        onChange={(e) => setHorasTrabalhadas(e.target.value)}
      />
      <button type="submit">Salvar</button>
      </form>
    </>
  )
}

export default App
