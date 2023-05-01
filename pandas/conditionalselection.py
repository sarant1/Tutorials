import numpy as np
import pandas as pd

arr_2 = np.random.randint(10, 50, size=(2,3))
df_1 = pd.DataFrame(arr_2, ['A', 'B'], ['C', 'D', 'E'])

print("df_1:")
print(df_1)


print("\nGreater than 40")
print(df_1 > 40)


bool_1 = df_1 >= 45

print("\nbool_1 = df_1 >= 45")
print(df_1[bool_1])



print("\ndf_1['E'] > 40")
print(df_1['E'] > 40)

df_2 = df_1[df_1['E'] > 30]
print("\ndf_2 = df_1[df_1['E'] > 30]")
print(df_2)


arr_3 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
df_3 = pd.DataFrame(arr_3, ['A', 'B', 'C'], ['X', 'Y', 'Z'])
print("\ndf_3:")
print(df_3)

print("\ndf_3['X'] > 3 & df_3['X'] < 7")
print(df_3[(df_3['X'] > 3) & (df_3['X'] < 7)])


# All rows that are true will print in the following print statement
print("\ndf_3['Z']> 3")
print(df_3['Z']> 3)

print("\ndf_3[df_z['Z']> 3]]")
print(df_3[df_3['Z'] > 3])


