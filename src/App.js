import React, { Component } from "react";

class Placar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pontosA: 0,
      pontosB: 0,
      hora: '00:00:00'
    };
  }

  componentDidMount() {
    // Atualizar a hora a cada segundo
    this.relogioId = setInterval(() => {
      this.setState({ hora: new Date().toLocaleTimeString() });
    }, 1000);

    // Incrementar pontos para o Time A a cada 60 segundos
    this.intervalA = setInterval(() => {
      this.setState((prevState) => ({
        pontosA: prevState.pontosA + 1
      }));
    }, 6000); // 60000ms = 60 segundos

    // Incrementar pontos para o Time B a cada 90 segundos
    this.intervalB = setInterval(() => {
      this.setState((prevState) => ({
        pontosB: prevState.pontosB + 1
      }));
    }, 9000); // 90000ms = 90 segundos
  }

  componentDidUpdate(prevProps, prevState) {
    // Verificar e logar quando a hora ou os pontos forem atualizados
    if (prevState.hora !== this.state.hora) {
      console.log('Atualizou Hora');
    }
    if (prevState.pontosA !== this.state.pontosA || prevState.pontosB !== this.state.pontosB) {
      console.log('Atualizou Times!');
    }
  }

  componentWillUnmount() {
    // Limpar intervalos ao desmontar o componente
    clearInterval(this.relogioId);
    clearInterval(this.intervalA);
    clearInterval(this.intervalB);
  }

  render() {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Placar ao Vivo</h1>
        <h1>HORA: {this.state.hora}</h1>
        <div>
          <h2>Time A: {this.state.pontosA} pontos</h2>
          <h2>Time B: {this.state.pontosB} pontos</h2>
        </div>
      </div>
    );
  }
}

export default Placar;
