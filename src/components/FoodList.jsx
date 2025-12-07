import FoodListItem from './FoodListItem';
import styles from './FoodList.module.css';

function FoodList({ items, onUpdate, onDelete }) {
  return (
    <ul className={styles.foodList}>
      {items.map((item) => (
        <li key={item.id}>
          <FoodListItem item={item} onUpdate={onUpdate} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}

export default FoodList;
