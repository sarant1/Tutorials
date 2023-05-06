import pandas as pd
import numpy as np


cs_df = pd.read_csv('csv/ComputerSales.csv')

print(cs_df.head())

# Seee column names
print("\nColumn names: ")
print(cs_df.columns)


print("\nProfit Mean: ")
print(cs_df['Profit'].mean())

print("\nProfit Maxes: ")
print(cs_df[['Profit', 'Product ID']].max(axis=0))


print("\nCount of WV: ")
print(cs_df[cs_df['State']=='WV']['State'].count())

print("Purchases in 2019: ")
print(len(cs_df[cs_df['Year']==2019].index))

# Get number of sales for each product type
print("\nNumber of sales for each product type: ")
print(cs_df['Product Type'].value_counts())

print("\nCustomer for a specific product")
print(cs_df[cs_df['Product ID']=='M01-F0024']['Contact'])

print("\nWebsite Purchase for a profit > 200$")
print(cs_df[(cs_df['Lead']=='Website') & (cs_df['Profit']>=150.0)])

print("\nProfit amounts end with .89cents")
print(cs_df['Profit'].apply(lambda cents: str(cents).split('.')[1]=='89').value_counts())




