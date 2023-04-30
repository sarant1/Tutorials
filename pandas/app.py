# Why pandas over excel ?
# 1. Pandas is faster than excel
# 2. Pandas is much more flexible
# 3. Larger data sets with pandas (BIG DATA)
import numpy as np
import pandas as pd

# Series 1D
list_1 = ['a', 'b', 'c', 'd']
labels = [1, 2, 3, 4]
ser_1 = pd.Series(data=list_1, index=labels)

print("Series 1:\n", ser_1)


arr_1 = np.array([1, 2, 3, 4])
ser_2 = pd.Series(arr_1)

print("Series 2:\n", ser_2)

dict_1 = {'f_name': "Derek", 'l_name': "Banas", 'age': 43}
ser_3 = pd.Series(dict_1)

print("Series 3:\n", ser_3)


print(ser_2 + ser_2)
print(ser_2 * ser_2)


print(np.exp(ser_2))


ser_4 = pd.Series({4: 5, 5: 6, 6: 7, 7: 8}, name="New Series")

print("Series 4 + Series 2:\n", ser_4 + ser_2)
print("series name: ", ser_4.name)



# Creating DataFrames

arr_2 = np.random.randint(10, 50, size=(2, 3))
df_1 = pd.DataFrame(arr_2)
print("Dataframe random (2, 3): \n", arr_2)

df_1 = pd.DataFrame(arr_2, ['A', 'B'], ['C', 'D', 'E'])
print("Dataframe random (2, 3): \n", df_1)


dict_3 = {'one': pd.Series([1., 2., 3.], index=['a', 'b', 'c']),
          'two': pd.Series([1., 2., 3., 4.], index=['a', 'b', 'c', 'd'])}

df_2 = pd.DataFrame(dict_3)
print("Dataframe dict_3: \n", df_2)

df_from_dict = pd.DataFrame.from_dict(dict({'A': [1, 2, 3], 'B': [4, 5, 6]}))

print("Dataframe from dict: \n", df_from_dict)

df_from_dict2 = pd.DataFrame.from_dict(dict({'A': [1, 2, 3], 'B': [4, 5, 6]}), orient='index', columns=['one', 'two', 'three'])
print("Dataframe from dict2 with orient='index': \n", df_from_dict2)


print("df_shape: ", df_1.shape)