# Стиль написания кода
## 1 - Условия в JSX (&&, тернарный оператор)
#### Только одно условие в JSX если для отрисовки элемента, нужно больше условий, то мы выносим их в переменные;
```diff
+ Правильно
```
![image](https://user-images.githubusercontent.com/81239058/152281150-cadad01c-b83d-4f3f-b4d7-bfe80aa58bb0.png)
```diff
- Непарвильно
```
![image](https://user-images.githubusercontent.com/81239058/152281431-c5d15bc2-9605-49c2-9b31-135dc58b7706.png)
```diff
! Исправляем
```
![image](https://user-images.githubusercontent.com/81239058/152281547-69236556-6a7f-4b29-b034-f5be5c5cd009.png)
