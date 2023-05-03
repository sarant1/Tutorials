import pandas as pd


df_12 = pd.DataFrame({'A': [1,2,3], 'b': [4,5,6]}, index=[1,2,3])
df_13 = pd.DataFrame({'A': [7,8,9], 'b': [10,11,12]}, index=[4,5,6])

print("df_12")
print(df_12)

print("\ndf_13")
print(df_13)

df_14 = pd.concat([df_12, df_13])
print("\nConcatenate df_12 and df_13")
print(df_14)

# This aint working right now for some reason

df_16 = pd.DataFrame({'A': [1,2,3], 'B': [4,5,6], 'key': [1,2,3]})
df_17 = pd.DataFrame({'A': [7,8,9], 'B': [10,11,12], 'key': [4,5,6]})

df_18 = pd.merge(df_16, df_17, how='right', on='key')

print("\ndf_16")
print(df_16)

print("\ndf_17")
print(df_17)

print("\nMerge df_16 and df_17 with how and key")
print(df_18)

print("\nJoin df_12 and df_13")
print(df_12.join(df_13, how='outer'))