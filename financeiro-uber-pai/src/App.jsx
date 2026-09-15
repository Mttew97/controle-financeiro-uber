import './App.css'
import { supabase } from './supabaseClient.js'
import { useState, useEffect } from 'react'
function obterInicioDaSemana() {
      const hoje = new Date()
      const diaDaSemana = hoje.getDay() // 0 = domingo, 1 = segunda, ..., 6 = sábado
      const inicioSemana = new Date(hoje)
      inicioSemana.setDate(hoje.getDate() - diaDaSemana)
      inicioSemana.setHours(0, 0, 0, 0)
      return inicioSemana
   }
function obterInicioDoMes() {
  const today = new Date()
  const inicioDoMes = new Date(today)
  inicioDoMes.setDate(1)
  inicioDoMes.setHours(0,0,0,0)
  return inicioDoMes
}

function App() {
    const [corridas, setCorridas] = useState('')
    const [data, setData] = useState('')
    const [valorGanho, setValorGanho] = useState('')
    const [horaInicio, setHoraInicio] = useState('')
    const [horaFim, setHoraFim] = useState('')
    const [descricaoGasto, setdescricaoGasto] = useState('')
    const [valorGasto, setvalorGasto] = useState('')
    const [dataGasto, setdataGasto] = useState('')
    const [abaAtiva, setAbaAtiva] = useState('lancar')
    const [lancamentos, setLancamentos] = useState([])
    const [gastosLista, setgastosLista] = useState([])


  async function buscarLancamentos() {
            const { data, error } = await supabase
            .from('lancamentos_diarios')
            .select('*')
            .order('data', { ascending: false })

            if (error) {
            console.error('Erro ao buscar:', error)
            } else {
                setLancamentos(data)
              }
        }
        async function buscarGastos(){
            const {data, error} = await supabase
            .from('gastos')
            .select('*')
            .order('data' , {ascending: false})
             if (error) {
            console.error('Erro ao buscar:', error)
            } else {
                setgastosLista(data)
              }

        }
        useEffect(() => {
           buscarGastos()
           buscarLancamentos()
    }, [])

    async function handleSubmit(e) {
    e.preventDefault()

    const {data: resultado, error} = await supabase
      .from('lancamentos_diarios')
      .insert([
        {
          data:data,
          corridas: parseFloat(corridas),
          valor_ganho: parseFloat(valorGanho),
          horas_trabalhadas: calcularHoras(horaInicio, horaFim)
        }])
      
      if(error) {
          console.error('Erro ao salvar:', error)
      } else{
        console.log('Salvo com sucesso:', resultado)
        setCorridas('')
        setData('')
        setValorGanho('')
        setHoraInicio('')
        setHoraFim('')
        buscarLancamentos()
        
      }}

       async function handleSubmitGasto(e) {
        e.preventDefault()

    const {data: resultado, error} = await supabase
      .from('gastos')
      .insert([
        {
          data:dataGasto,
          valor: parseFloat(valorGasto),
          descricao: descricaoGasto,
        }
      ])
      
      if(error) {
          console.error('Erro ao salvar:', error)
      } else{
        console.log('Salvo com sucesso:', resultado)
        setdataGasto('')
        setvalorGasto('')
        setdescricaoGasto('')
        buscarGastos()
      }}

      const totalGanho = lancamentos.reduce((acumulador, item) => {
        return acumulador + item.valor_ganho
      }, 0)
      const totalGasto = gastosLista.reduce((acumulador, item) => {
        return acumulador + item.valor
      }, 0)
      const saldo = totalGanho - totalGasto

      async function excluirLancamento(id) {
          const { error } = await supabase
          .from('lancamentos_diarios')
          .delete()
          .eq('id', id)
        if (error) {
          console.error('Erro ao excluir:', error)
        } else {
          buscarLancamentos()
        }
      }
      const inicioSemana = obterInicioDaSemana()

      const ganhoSemana = lancamentos
        .filter(item => new Date(item.data) >= inicioSemana)
        .reduce((acumulador, item) => acumulador + item.valor_ganho, 0)

      const gastoSemana = gastosLista
        .filter(item => new Date(item.data) >= inicioSemana)
        .reduce((acumulador, item) => acumulador + item.valor, 0)

      const saldoSemana = ganhoSemana - gastoSemana
      const dizimo = saldoSemana * 0.10

      const inicioDoMes = obterInicioDoMes()

      const ganhoMes = lancamentos
      .filter(item => new Date(item.data) >= inicioDoMes)
      .reduce ((acumulador, item) => acumulador + item.valor_ganho, 0)

       const gastoMes = gastosLista
      .filter(item => new Date(item.data) >= inicioDoMes)
      .reduce ((acumulador, item) => acumulador + item.valor, 0)

      const saldoMes = ganhoMes - gastoMes

      const horasTrabalhadasMes = lancamentos
      .filter(item => new Date(item.data) >= inicioDoMes)
      .reduce((acumulador, item) => acumulador + item.horas_trabalhadas, 0)

      async function excluirGasto(id) {
          const { error } = await supabase
            .from('gastos')
            .delete()
            .eq('id', id)
          if (error) {
            console.error('Erro ao excluir:', error)} 
          else {
          buscarGastos()}
          
      }

      function calcularHoras(inicio, fim) {
          const [horaIni, minIni] = inicio.split(':').map(Number)
          const [horaFim, minFim] = fim.split(':').map(Number)

          const minutosInicio = horaIni * 60 + minIni
          const minutosFim = horaFim * 60 + minFim

          const diferencaMinutos = minutosFim - minutosInicio
        return diferencaMinutos / 60        
      }

return (
    <>
   <nav>
        <button
          className={abaAtiva === 'lancar' ? 'aba-ativa' : ''}
          onClick={() => setAbaAtiva('lancar')}
        >
          Lançar
        </button>
        <button
          className={abaAtiva === 'resumo' ? 'aba-ativa' : ''}
          onClick={() => setAbaAtiva('resumo')}
        >
          Resumo
        </button>
  </nav>
    
    <h1>Controle Financeiro</h1>

    {abaAtiva === 'lancar' && (
      <>
          <section className='lancamentos-diario'>
              <h2>Lançamento do dia</h2>
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
            <label htmlFor="HoraComeco">Hora de inicio</label>
            <input 
              id="horasComeco"
              type="time" 
              value={horaInicio}
              onChange={(e) => setHoraInicio(e.target.value)}
            />
            <label htmlFor="HoraTermino">Hora de término</label>
            <input 
              id="horasTermino"
              type="time" 
              value={horaFim}
              onChange={(e) => setHoraFim(e.target.value)}
            />
            <button type="submit">Salvar</button>
            </form>
        </section> 

        <section className='gastos'>
        <h2>Registrar gasto</h2>
        <form onSubmit={handleSubmitGasto}>
              <label htmlFor='descricaoGasto'>Descreva seu gasto</label>
              <input
              id='descricaoGasto'
              type='text'
              value={descricaoGasto}
              onChange={(e) => setdescricaoGasto(e.target.value)} />
              <label htmlFor='valorGasto'>Qual valor foi gasto</label>
              <input
              id='valorGasto'
              type='number'
              value={valorGasto}
              onChange={(e) => setvalorGasto(e.target.value)} />
              <label htmlFor='dataGasto'>Qual a data do gasto</label>
              <input
              id='dataGasto'
              type='date'
              value={dataGasto}
              onChange={(e) => setdataGasto(e.target.value)} />
              <button type="submit">Salvar Gasto</button>
        </form>
        </section>

        </>
      )}

      {abaAtiva === 'resumo' &&(
        <>
          <div className="totais">
              <p>Total ganho: R$ {totalGanho.toFixed(2)}</p>
              <p>Total gasto: R$ {totalGasto.toFixed(2)}</p>
              <p>Total de horas trabalhadas: {horasTrabalhadasMes}h</p>
              <p>Dízimo: R$ {dizimo.toFixed(2)}</p>
              <p>Saldo: R$ {saldoMes.toFixed(2)}</p>
              
          </div>

          <h3>Receita:</h3>
          <ul>
        {  lancamentos.map((item) => (
              <li key={item.id}>
                 {item.data} — {item.corridas} corridas — R$ {item.valor_ganho} — Horas trabalhadas  {item.horas_trabalhadas}h
                  <button className="btn-excluir" onClick={() => excluirLancamento(item.id)}>Excluir</button>
              </li>
               ))}
          </ul>
          <h3>Gastos:</h3>
          <ul>
  {          gastosLista.map((item) => (
              <li key={item.id}>
                 {item.data} — descrição: {item.descricao} R$ {item.valor}
                 <button className="btn-excluir" onClick={() => excluirGasto(item.id)}>Excluir</button>
              </li>
               ))}
          </ul>
          
        </>
      )}
      </>
    )
}
export default App
