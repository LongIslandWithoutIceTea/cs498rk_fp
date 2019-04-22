import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default class PlayerWeaponTable extends Component {
  render() {
    return (
      <Table celled structured striped collapsing unstackable className="PlayerWeaponTable">
        <Table.Header className="PlayerWeaponTableHeader">
          <Table.Row>
            <Table.HeaderCell colSpan='3'>Main Battery</Table.HeaderCell>
            <Table.HeaderCell colSpan='3'>Torpedos</Table.HeaderCell>
            <Table.HeaderCell colSpan='3'>Secondary Battery</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Aircraft</Table.HeaderCell>
            <Table.HeaderCell colSpan='2'>Ramming</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell>Max Kills</Table.HeaderCell>
            <Table.HeaderCell>Average Kills</Table.HeaderCell>
            <Table.HeaderCell>Hit Rate</Table.HeaderCell>

            <Table.HeaderCell>Max Kills</Table.HeaderCell>
            <Table.HeaderCell>Average Kills</Table.HeaderCell>
            <Table.HeaderCell>Hit Rate</Table.HeaderCell>

            <Table.HeaderCell>Max Kills</Table.HeaderCell>
            <Table.HeaderCell>Average Kills</Table.HeaderCell>
            <Table.HeaderCell>Hit Rate</Table.HeaderCell>

            <Table.HeaderCell>Max Kills</Table.HeaderCell>
            <Table.HeaderCell>Average Kills</Table.HeaderCell>

            <Table.HeaderCell>Max Kills</Table.HeaderCell>
            <Table.HeaderCell>Average Kills</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="PlayerWeaponTableBody">
          <Table.Row key={this.props.selectedShipData.ship_id}>
            <Table.Cell>{this.props.selectedShipData.main_battery_max_frags_battle}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.main_battery_frags}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.main_battery_hit_rate}</Table.Cell>

            <Table.Cell>{this.props.selectedShipData.torpedoes_max_frags_battle}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.torpedoes_frags}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.torpedoes_hit_rate}</Table.Cell>

            <Table.Cell>{this.props.selectedShipData.second_battery_max_frags_battle}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.second_battery_frags}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.second_battery_hit_rate}</Table.Cell>

            <Table.Cell>{this.props.selectedShipData.aircraft_max_frags_battle}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.aircraft_frags}</Table.Cell>

            <Table.Cell>{this.props.selectedShipData.ramming_max_frags_battle}</Table.Cell>
            <Table.Cell>{this.props.selectedShipData.ramming_frags}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
