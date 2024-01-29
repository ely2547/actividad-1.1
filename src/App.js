import React, { useState, useEffect } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

// se crea una clase para representar los elementos del inventario
class Item {
  constructor(id, value, quantity) {
    this.id = id;
    this.value = value;
    this.quantity = quantity;
  }
}

// Se crea una clase para representar la aplicación
class App extends React.Component {
  constructor(props) {
    super(props);
    // Inicializa el estado con un arreglo vacío de elementos
    this.state = {
      items: [],
      searchTerm: '',
      alert: false
    };
  }

  // Se usa el ciclo de vida de React para obtener y guardar los datos en el almacenamiento local
  componentDidMount() {
    const data = localStorage.getItem('items');
    if (data) {
      this.setState({ items: JSON.parse(data) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('items', JSON.stringify(this.state.items));
  }

  // Se definen los métodos para agregar, eliminar y editar los elementos
  addItem = () => {
  // Crear un nuevo elemento con los datos ingresados por el usuario
    const newItem = new Item(Date.now(), prompt('Nombre'), prompt('Cantidad'));
  // Actualizar el estado con el nuevo elemento y mostrar la alerta
    this.setState((prevState) => ({
      items: [...prevState.items, newItem],
      alert: true
    }));
  // Ocultar la alerta después de 3 segundos
    setTimeout(() => {
      this.setState({ alert: false });
    }, 3000);
  };

  deleteItem = (id) => {
  // Filtrar el arreglo de elementos para eliminar el que tenga el id dado
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.id !== id)
    }));
  };

  editItem = (id) => {
  // Obtener el nuevo nombre y la nueva cantidad ingresados por el usuario
    const newName = prompt('Nuevo nombre');
    const newQuantity = prompt('Nueva cantidad');
  // Mapear el arreglo de elementos para editar el que tenga el id dado
    this.setState((prevState) => ({
      items: prevState.items.map((item) => {
        if (item.id === id) {
        // Retornar un nuevo objeto con el nuevo nombre y la nueva cantidad
          return new Item(item.id, newName, newQuantity);
        }
        // Retornar el mismo objeto si no coincide el id
        return item;
      })
    }));
  };
   // Definir el método para buscar los elementos por su nombre
  searchItems = (e) => {
    // Actualizar el estado con el valor del input
    this.setState({ searchTerm: e.target.value });
  };
  // Definir el método para renderizar la interfaz de la aplicación
  render() {
    // Filtrar los elementos según el término de búsqueda
    const filteredItems = this.state.items.filter((item) =>
      item.value.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );

    return (
      <div className="App bg-gradient-to-r from-slate-300 via-pink-500 to-sky-400 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold text-white text-center">Inventario</h1>
          <div className="flex justify-center items-center mt-4">
            <input
              type="text"
              placeholder="Buscar"
              value={this.state.searchTerm}
              onChange={this.searchItems}
              className="w-1/2 rounded-lg border-2 border-white shadow-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 p-2"
            />
            <button onClick={this.addItem} className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-lg ml-4 shadow-lg">Agregar</button>
          </div>
          {this.state.alert && <div className="alert bg-green-200 text-green-800 p-2 rounded-lg my-4 mx-auto w-1/2 text-center">Elemento agregado al inventario</div>}
          <table className="table-auto mx-auto my-4 w-1/2">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white bg-gray-800 rounded-tl-lg">Nombre</th>
                <th className="px-4 py-2 text-white bg-gray-800">Cantidad</th>
                <th className="px-4 py-2 text-white bg-gray-800 rounded-tr-lg">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2 bg-white">{item.value}</td>
                  <td className="border px-4 py-2 bg-white">{item.quantity}</td>
                  <td className="border px-4 py-2 bg-white flex justify-center items-center">
                    <button onClick={() => this.deleteItem(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Eliminar</button>
                    <button onClick={() => this.editItem(item.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Editar</button>
                  </td>           
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default App;
