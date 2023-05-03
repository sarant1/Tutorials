import pandas as pd
import numpy as np


dict_5 = {'Store': [1,2,1,2], 'Flavor': ['Choc', 'Van', 'Straw', 'Choc'], 'Sales': [20, 25, 22, 28]}
df_11 = pd.DataFrame(dict_5)
print("df_11")
print(df_11)

by_store = df_11.groupby('Store')

print("\nUsing groupby to get the mean of the slaes by store")
print(by_store.mean(numeric_only=True))

print("\n Find the sum of the sales by store")
print(by_store.sum().loc[2])

print("\nDescribe store data")
print(by_store.describe())
