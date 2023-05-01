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
print(df_1, "\n")

dict_3 = {'one': pd.Series([1., 2., 3.], index=['a', 'b', 'c']),
          'two': pd.Series([1., 2., 3., 4.], index=['a', 'b', 'c', 'd'])}

df_2 = pd.DataFrame(dict_3)
print("Dataframe dict_3: ")
print(df_2, "\n")

df_2['mult'] = df_2['one'] * df_2['two']
print("df_2['mult'] = df_2['one'] * df_2['two']")
print(df_2, "\n")


dict_2 = {'C': 44, 'D': 45, 'E': 46}
new_row = pd.Series(dict_2, name='F')
df_1 = df_1._append(new_row)



print("df_1.append(new_row): ")
print(df_1, "\n")


# Inplace is required to drop 
df_1.drop('Total', axis=1, inplace=True)
print("df_1.drop('Total', axis=1, inplace=True): ")
print(df_1, "\n")


df_1.drop("B", axis=0, inplace=True)
print("df_1.drop('B', axis=0, inplace=True): ")
print(df_1, "\n")


df_1['Sex'] = ['Men', 'Women']
df_1.set_index('Sex', inplace=True)
print("df_1.set_index('Sex', inplace=True): ")
print(df_1, "\n")

df_1.reset_index(inplace=True)
print("df_1.reset_index(inplace=True): ")
print(df_1, "\n")


# When you combine them, the nan values are replaced by the values in the second dataframe

df_3 = pd.DataFrame({'A': [1., np.nan, 3., np.nan]})
df_4 = pd.DataFrame({'A': [1., 2., 3., 4.]})
df_3 = df_3.combine_first(df_4)

print("df_3.combine_first(df_4): ")
print(df_3, "\n")
