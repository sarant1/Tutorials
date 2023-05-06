import pandas as pd
import numpy as np

# MultiIndexing, storing data on multiple different dimensions

days = ['Day 1', 'Day 1', 'Day 1', 'Day 2', 'Day 2', 'Day 2']
meals = [1, 2, 3, 1, 2, 3]
hier_index = list(zip(days, meals))

print("hier_index:")
print(hier_index)

hier_index = pd.MultiIndex.from_tuples(hier_index)

arr_5 = np.random.randint(500, 700, size=(6, 2))
df_8 = pd.DataFrame(arr_5, hier_index, ['M', 'F'])

# Cool
print("\ndf_8 after magic")
print(df_8)

print("\ndf_8.loc['Day 1']")
print(df_8.loc['Day 1'])


print("\ndf_8.loc['Day 1'].loc[1]")
print(df_8.loc['Day 1'].loc[1])


print("\ndf_8.loc['Day 2'].loc[2]")
print(df_8.loc['Day 2'].loc[2])

df_8.index.names = ['Day', 'Meal']
print("\nadd names to indexes: ")
print(df_8)

print("\ndf_8.xs('Day 1')")
print(df_8.xs('Day 2'))

dict_6 = { 'A': ['Day 1', 'Day 1', 'Day 1', 'Day 2', 'Day 2', 'Day 2'],
           'B': [1, 2, 3, 1, 2, 3],
           'C': ['M', 'F', 'M', 'F', 'M', 'F'],
           'D': [10, 20, 30, 40, 50, 60] }
df_14 = pd.DataFrame(dict_6)
print("\nUsing a pivot table: ")
print(df_14.pivot_table(values='D', index=['A', 'B'], columns=['C']))


