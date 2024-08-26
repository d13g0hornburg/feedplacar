import React, { Component } from "react";

class Placar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pontosA: 0,
      pontosB: 0,
      hora: '00:00:00',
      iniciado: false // Novo estado para controlar se o placar está ativo
    };
  }

  iniciarPlacar = () => {
    this.setState({ iniciado: true });

    this.relogioId = setInterval(() => {
      this.setState({ hora: new Date().toLocaleTimeString() });
    }, 1000);

    this.intervalA = setInterval(() => {
      this.setState((prevState) => ({
        pontosA: prevState.pontosA + 1
      }));
    }, 60000);

    this.intervalB = setInterval(() => {
      this.setState((prevState) => ({
        pontosB: prevState.pontosB + 1
      }));
    }, 90000);
  };

  pararPlacar = () => {
    this.setState({ iniciado: false });
    this.componentWillUnmount();
  };

  componentWillUnmount() {
    clearInterval(this.relogioId);
    clearInterval(this.intervalA);
    clearInterval(this.intervalB);
    console.log('Component desmontado e intervalos limpos');
  }

  render() {
    const containerStyle = {
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif"
    };

    const relogioStyle = {
      fontSize: "2em",
      color: "#555"
    };

    const timeContainerStyle = {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      marginTop: "30px"
    };

    const timeStyle = {
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
    };

    const timeAStyle = {
      ...timeStyle,
      border: "2px solid #007bff",
      color: "#007bff"
    };

    const timeBStyle = {
      ...timeStyle,
      border: "2px solid #ff4500",
      color: "#ff4500"
    };

    return (
      <div style={containerStyle}>
        <h1>Placar ao Vivo</h1>
        {this.state.iniciado ? (
          <div>
            <h1 style={relogioStyle}>HORA: {this.state.hora}</h1>
            <div style={timeContainerStyle}>
              <div style={timeAStyle}>
                <h2>Time A</h2>
                <p>{this.state.pontosA} pontos</p>
              </div>
              <div style={timeBStyle}>
                <h2>Time B</h2>
                <p>{this.state.pontosB} pontos</p>
              </div>
            </div>
            <button onClick={this.pararPlacar}>Parar Placar</button>
          </div>
        ) : (
          <button onClick={this.iniciarPlacar}>Iniciar Placar</button>
        )}
      </div>
    );
  }
}

export default Placar;
