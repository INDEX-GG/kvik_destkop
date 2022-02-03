# Стиль написания кода
# Самое главное правило Don’t repeat yourself (Никогда не повторяйся)
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
## 2 - Не забывать про переиспользуемость / маленькие компоненты. (Максимальное количество строк в одном файле не более 100, могут быть исключения). Если ты можешь это сделать переиспользуемым, делай!!;
## 3 - События (Разберем на событии onClick);
```diff
@@ Не использовать ананимные функции () => setState(....)
```
#### 1 - Функция без аргументов
![image](https://user-images.githubusercontent.com/81239058/152282837-04377116-8476-4ab3-a896-ae55573d8ba9.png)
#### 2 - Функции с аргументами
![image](https://user-images.githubusercontent.com/81239058/152283282-478b3c8f-9bdf-4072-bfbc-08d2e3043d38.png)
## 4 - Передача пропсов, через spread запрещена!
```diff
- Неправильно
```
![image](https://user-images.githubusercontent.com/81239058/152283782-c160c452-b79e-4cb6-8d14-a75c144471c6.png)
```diff
+ Правильно
```
![image](https://user-images.githubusercontent.com/81239058/152284049-8c166cdf-d124-46bf-8793-8b811d891b86.png)
### 5 - Kj
