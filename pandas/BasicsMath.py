import pandas as pd
import numpy as np



cs_df = pd.read_csv('csv/ComputerSales.csv')
print("PRINTING cs_df.head() first 5")
print(cs_df.head())

print("\nPRINTING cs_df.tail() last 5")
print(cs_df.tail())

print("\n get the firt amount of rows cs_df[:4]")
print(cs_df[:4])

print("\n get the firt amount of rows cs_df[:10:2] AND step by 2")
print(cs_df[:10:2])

print("\n get indexes cs_df.index.array")
print(cs_df.index.array)

# print("\n convert to numpy array")
# print(cs_df.to_numpy())

dict_3 = {'one': pd.Series([1.,2.,3.], index=['a','b','c']),
          'two': pd.Series([1.,2.,3.,4.], index=['a','b','c','d'])}

df_2 = pd.DataFrame(dict_3)

print("\nPRINTING df_2 Before:")
print(df_2)

# Replace any NAN with 0
df_2.fillna(0, inplace=True)

print("\nPRINTING df_2 After:")
print(df_2)

row = df_2.iloc[1]
print("\nadding with axis columns: ")
print(df_2.add(row, axis='columns'))


col = df_2['two']
print("\nSubtract from dataframe")
print(df_2.subtract(col, axis=0))



# Transform will execute a function on a dataframe

df_5 = pd.DataFrame({'A': range(4), 'B': range(1, 5)})
print("\ndf_5 before transform: ")
print(df_5)

print("\ndf_5 after transform: ")
print(df_5.transform([lambda x: x**2, lambda x: x**3]))

print("\nTransform with dictionary:")
print(df_5.transform({'A': lambda x: x**2, 'B': lambda x: x**3}))

print("\nUsing .applymap")
print(df_5.applymap(lambda x: x**2))

print("\nGetting unique values from df_2")
print(df_2['two'].unique())
# Total number of uniqe values
print(df_2['two'].nunique())
# Number of times a value showed up in a column
print("\ndf_2 value counts for column two")
print(df_2['two'].value_counts())

print("\nColumn names")
print(df_2.columns)

print("\nIndex names")
print(df_2.index)

print("\nis Null?")
print(df_2.isnull())