import React, { Component } from 'react';
import './HeaderTable.css';

export default class HeaderTable extends Component {
  render() {
    return (
      <tr className="tableTH">
        <th className="Tht">Descrição</th>
        <th className="Tht">Tag</th>
        <th className="Tht">Método de pagamento</th>
        <th className="Tht">Valor</th>
        <th className="Tht">Moeda</th>
        <th className="Tht">Câmbio utilizado</th>
        <th className="Tht">Valor convertido</th>
        <th className="Tht">Moeda de conversão</th>
        <th className="Tht">Editar/Excluir</th>
      </tr>
    );
  }
}
