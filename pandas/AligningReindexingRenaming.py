import pandas as pd
import numpy as np

ser_6 = pd.Series(range(5), index=['a', 'b', 'c', 'd', 'e'])
sl_1 = ser_6[:4]
sl_2 = ser_6[1:]

print("sl_1: ")
print(sl_1)
print("\nsl_2: ")
print(sl_2)

print("\nUsing Align: ")
print(sl_1.align(sl_2))

print("\nUsing Align w/ join=outer: ")
print(sl_1.align(sl_2, join='outer'))

arr_3 = np.random.randint(10, 50, size=(2, 3))
df_6 = pd.DataFrame(arr_3, ['A', 'B'], ['C', 'D', 'E'])
arr_3 = np.random.randint(10, 50, size=(2, 3))
df_7 = pd.DataFrame(arr_3, ['B', 'C'], ['C', 'D', 'E'])


print("\ndf_6")
print(df_6)
print("\ndf_7")
print(df_7)

print("\nUsing Align: ")
print(df_6.align(df_7, join='outer'))

# This will reindex axis=0
print("\nUsing Reindex: ")
print(df_6.reindex(['B', 'A']))

# This will remove D column
print("\nUsing .drop(): ")
print(df_6.drop(['D'], axis=1))

# Rename labels
print("\nUsing .rename(): ")
print(df_6.rename({'A': 'bad', 'B': 'men'}, axis='index'))
print(df_6.rename({'C': 'Sea', 'D': 'Dee', 'E': 'Eee'}, axis='columns'))
