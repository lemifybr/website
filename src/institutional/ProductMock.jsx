import dashboard from './assets/product-dashboard.jpg'
import lemi from './assets/lemi.webp'
import { Tilt } from './motion.jsx'

/** Painel do produto: print do dashboard (dados de demonstração) + elementos gráficos flutuantes. */
export default function ProductMock() {
  return (
    <div className="mock" aria-hidden="false">
      <div className="mock__glow" />

      <Tilt className="mock__tilt" max={4}>
        <div className="mock__win">
          <div className="mock__bar"><i /><i /><i /><span>app.lemify.com.br</span></div>
          <img src={dashboard} alt="Dashboard do Lemify com indicadores de atendimento, tempo de resposta e receita" loading="lazy" />
        </div>
      </Tilt>

      <div className="mock__float mock__float--agent" data-parallax="0.35">
        <div className="mock__card mock__card--agent">
          <img src={lemi} alt="" />
          <div><strong>Lemi respondeu</strong><span>em 8 segundos</span></div>
        </div>
      </div>

      <div className="mock__float mock__float--chat" data-parallax="-0.3">
        <div className="mock__card mock__card--chat">
          <p className="bub bub--in">Oi! Tem esse tênis no 39?</p>
          <p className="bub bub--out">Tem sim! Separo um para você retirar hoje.</p>
        </div>
      </div>

      <div className="mock__float mock__float--stat" data-parallax="0.5">
        <div className="mock__card mock__card--stat">
          <span>Atendimentos finalizados</span>
          <strong>386 <em>+12%</em></strong>
          <div className="mock__bars"><b style={{ '--h': '38%' }} /><b style={{ '--h': '55%' }} /><b style={{ '--h': '44%' }} /><b style={{ '--h': '72%' }} /><b style={{ '--h': '60%' }} /><b style={{ '--h': '88%' }} /><b style={{ '--h': '100%' }} /></div>
        </div>
      </div>

      <div className="mock__float mock__float--ok" data-parallax="-0.45">
        <div className="mock__card mock__card--ok">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          Pedido encaminhado para a equipe
        </div>
      </div>
    </div>
  )
}
