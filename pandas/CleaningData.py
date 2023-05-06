import numpy as np
import pandas as pd

dict_4 = { 'A': [1, 2, np.nan], 'B': [5, np.nan, np.nan], 'C': [7., 8., 9.] }
df_10 = pd.DataFrame(dict_4)

print(df_10)

print("\nDrop rows with NaN values: ")
print(df_10.dropna())

print("\nDrop columns with NaN values: ")
print(df_10.dropna(axis=1))

print("\nDrop rows with NaN values, threshold=2: ")
print(df_10.dropna(thresh=2))

print("\nFill NaN values with 9: ")
print(df_10.fillna(value=9))