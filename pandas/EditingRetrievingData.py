import pandas as pd
import numpy as np

# Check version of pandas
print(pd.__version__)
arr_2 = np.random.randint(10, 50, size=(2, 3))
df_1 = pd.DataFrame(arr_2, ["A", "B"], ["C", "D", "E"])

print("df_1:")
print(df_1, "\n")

print("df_1[['C', 'E']]:")
print(df_1[['C', 'E']], "\n")

print("df_1.loc['A']:")
print(df_1.loc['A'], "\n")

print("df_1.iloc[1]")
print(df_1.iloc[1], "\n")

print("df_1['Total'] = df_1['C'] + df_1['D'], df_1['E']")
df_1['Total'] = df_1['C'] + df_1['D'] + df_1['E']
print(df_1)
