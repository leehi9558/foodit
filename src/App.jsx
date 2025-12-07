import { useState } from 'react';
import Layout from './components/Layout';
import FoodList from './components/FoodList';
import Modal from './components/Modal';
import mockItems from './mock.json';
import FoodForm from './components/FoodForm';
import Button from './components/Button';
import Input from './components/Input';
import styles from './App.module.css';

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState('createdAt');
  const [keyword, setKeyword] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleLatestClick = () => setOrder('createdAt');

  const handleCalorieClick = () => setOrder('calorie');

  const handleKeywordChange = (e) => setKeyword(e.target.value);

  const handleCreate = (data) => {
    const now = new Date();
    const newItem = {
      id: items.length + 1,
      ...data,
      createdAt: now.valueOf(),
      updatedAt: now.valueOf(),
    };
    setItems([newItem, ...items]);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = (id, data) => {
    const targetIndex = items.findIndex((item) => item.id === id);
    if (targetIndex < 0) return;

    const now = new Date();
    const nextItem = {
      ...items[targetIndex],
      ...data,
      updatedAt: now.valueOf(),
    };
    const nextItems = [
      ...items.slice(0, targetIndex),
      nextItem,
      ...items.slice(targetIndex + 1),
    ];

    setItems(nextItems);
  };

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const resultItems = items
    .sort((a, b) => b[order] - a[order])
    .filter(
      (item) => item.title.includes(keyword) || item.content.includes(keyword)
    );

  return (
    <Layout>
      <div className={styles.header}>
        <Input
          variant="search"
          onChange={handleKeywordChange}
          placeholder="검색어를 입력해주세요"
        />
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.filter} ${
              order === 'createdAt' ? styles.active : ''
            }`}
            onClick={handleLatestClick}
          >
            최신순
          </button>
          <button
            className={`${styles.filter} ${
              order === 'calorie' ? styles.active : ''
            }`}
            onClick={handleCalorieClick}
          >
            칼로리순
          </button>
          <Button onClick={() => setIsCreateModalOpen(true)}>추가하기</Button>
          <Modal
            title="칼로리 기록하기"
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
          >
            <FoodForm onSubmit={handleCreate} />
          </Modal>
        </div>
      </div>
      <FoodList
        items={resultItems}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </Layout>
  );
}

export default App;
