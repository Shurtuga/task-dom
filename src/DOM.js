import { constants } from 'buffer';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        let elem = document.createElement(tag); // создали узел-элемент
        elem.innerHTML = content;
        document.body.append(elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level, order = 1) {
    let root = document.createElement('div');
    if (level != 1) {
        let ins = generateTree(childrenCount, level - 1, order + 1);
        root.className = `item_${order}`;
        for (let i = 0; i < childrenCount; i++) {
            root.append(ins.cloneNode(true));
        }
    } else {
        root.className = `item_${order}`;
    }
    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let root = generateTree(2, 3);
    let replacable = root.getElementsByClassName('item_2');
    for (let i = 0; i < replacable.length; i++) {
        let rep = document.createElement('section');
        rep.className = 'item_2';
        replacable[i].childNodes.forEach((element) => {
            rep.append(element.cloneNode(true));
        });
        root.replaceChild(rep, replacable[i], rep);
    }
    return root;
}
