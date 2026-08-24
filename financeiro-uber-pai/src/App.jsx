import { useState } from 'react'
import './App.css'
import { supabase } from './supabaseClient.js'




function App() {
    const [corridas, setCorridas] = useState('')
    const [data, setData] = useState('')
    const [valorGanho, setValorGanho] = useState('')
    const [horasTrabalhadas, setHorasTrabalhadas] = useState('')
    
    async function handleSubmit(e) {
    e.preventDefault()

    const {data: resultado, error} = await supabase
      .from('lancamentos_diarios')
      .insert([
        {
          data:data,
          corridas: parseFloat(corridas),
          valor_ganho: parseFloat(valorGanho),
          horas_trabalhadas: parseFloat(horasTrabalhadas)
        }
      ])
      
      if(error) {
          console.error('Erro ao salvar:', error)
      } else{
        console.log('Salvo com sucesso:', resultado)
      }}

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
