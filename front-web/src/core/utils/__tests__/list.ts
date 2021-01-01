import {generateList} from '../list';

test('should generate a list', () => {
    //Arrange
    const amount = 5;
    //Act
    const result = generateList(amount);
    //Assert    
    expect(result).toEqual([0, 1, 2, 3, 4]);
});

test('should generate an empty list when amount is zero', () => {
    //Arrange
    const amount = 0;
    //Act
    const result = generateList(amount);
    //Assert    
    expect(result).toEqual([]);
});