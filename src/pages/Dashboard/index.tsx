import { Component, useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import { api } from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface IFood{
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface AddForm{
  image: string;
  name: string;
  prince: string;
  description: string;
}

export function Dashboard(){
  const [foods, setFoods] = useState<IFood[]>([]);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function getFood() {
      const response = await api.get('/foods');
      setFoods(response.data);
    }
    getFood();
  }, [])
  
  async function handleAddFood(food: AddForm): Promise<void>{
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: AddForm): Promise<void>{
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number){
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal(){
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(){
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFood){
    setEditModalOpen(true);
    setEditingFood(food);
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
}

