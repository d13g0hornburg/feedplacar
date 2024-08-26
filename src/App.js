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
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hora !== this.state.hora) {
      console.log('Atualizou Hora');
    }
    if (prevState.pontosA !== this.state.pontosA || prevState.pontosB !== this.state.pontosB) {
      console.log('Atualizou Times!');
    }
  }

  componentWillUnmount() {
    clearInterval(this.relogioId);
    clearInterval(this.intervalA);
    clearInterval(this.intervalB);
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
      </div>
    );
  }
}

export default Placar;
